import React, { useState, useRef, useCallback, useEffect } from 'react';
import { WordAnalysis } from '../pages/api/grammatical-analysis';
import { WordGrammaticalData, SentenceGrammaticalData } from '../data/lessons';
import { getPrecomputedWordAnalysis } from '../lib/grammaticalAnalysis';

interface GrammaticalHighlighterProps {
  text: string;
  sentenceId?: string;
  grammaticalData?: SentenceGrammaticalData[];
  lessonId?: number;
  className?: string;
}

interface HighlightState {
  selectedText: string;
  selectedRange: Range | null;
  analysis: WordAnalysis[] | null;
  isLoading: boolean;
  error: string | null;
  showAnalysis: boolean;
  hasSelection: boolean;
}

const caseColors = {
  nominative: 'bg-blue-200 border-blue-400 text-blue-900',
  genitive: 'bg-green-200 border-green-400 text-green-900', 
  dative: 'bg-yellow-200 border-yellow-400 text-yellow-900',
  accusative: 'bg-red-200 border-red-400 text-red-900',
  ablative: 'bg-purple-200 border-purple-400 text-purple-900',
  vocative: 'bg-pink-200 border-pink-400 text-pink-900'
};

const partOfSpeechColors = {
  noun: 'bg-blue-100 border-blue-300',
  verb: 'bg-green-100 border-green-300',
  adjective: 'bg-yellow-100 border-yellow-300',
  adverb: 'bg-orange-100 border-orange-300',
  preposition: 'bg-gray-100 border-gray-300',
  conjunction: 'bg-indigo-100 border-indigo-300',
  interjection: 'bg-pink-100 border-pink-300',
  pronoun: 'bg-cyan-100 border-cyan-300'
};

export default function GrammaticalHighlighter({
  text,
  sentenceId,
  grammaticalData,
  lessonId,
  className = ''
}: GrammaticalHighlighterProps) {
  const [highlightState, setHighlightState] = useState<HighlightState>({
    selectedText: '',
    selectedRange: null,
    analysis: null,
    isLoading: false,
    error: null,
    showAnalysis: false,
    hasSelection: false
  });

  const textRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const highlightButtonRef = useRef<HTMLButtonElement>(null);

  // Get pre-computed analysis for this sentence
  const getPrecomputedAnalysis = useCallback((selectedText: string): WordAnalysis[] | null => {
    const cleanText = selectedText.replace(/[""".,!?;:]/g, '').trim();
    const selectedWords = cleanText.split(/\s+/).filter(word => word.length > 0);
    
    // First try lesson-specific pre-computed data
    if (grammaticalData && sentenceId) {
      const sentenceData = grammaticalData.find(data => data.sentenceId === sentenceId);
      if (sentenceData) {
        const matchingAnalysis: WordAnalysis[] = [];
        
        for (const selectedWord of selectedWords) {
          const wordData = sentenceData.words.find(w => 
            w.word.toLowerCase() === selectedWord.toLowerCase()
          );
          
          if (wordData) {
            matchingAnalysis.push({
              word: wordData.word,
              lemma: wordData.lemma,
              case: wordData.case,
              number: wordData.number,
              gender: wordData.gender,
              partOfSpeech: wordData.partOfSpeech,
              person: wordData.person,
              tense: wordData.tense,
              voice: wordData.voice,
              mood: wordData.mood,
              notes: wordData.notes
            });
          }
        }
        
        if (matchingAnalysis.length > 0) {
          return matchingAnalysis;
        }
      }
    }
    
    // Fallback to global precomputed data
    const globalAnalysis: WordAnalysis[] = [];
    for (const selectedWord of selectedWords) {
      const wordAnalysis = getPrecomputedWordAnalysis(selectedWord);
      if (wordAnalysis) {
        globalAnalysis.push(wordAnalysis);
      }
    }
    
    return globalAnalysis.length > 0 ? globalAnalysis : null;
  }, [grammaticalData, sentenceId]);

  // Handle text selection
  const handleTextSelection = useCallback(async () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setHighlightState(prev => ({ ...prev, showAnalysis: false, hasSelection: false }));
      return;
    }

    const selectedText = selection.toString().trim();
    if (!selectedText) {
      setHighlightState(prev => ({ ...prev, showAnalysis: false, hasSelection: false }));
      return;
    }

    const range = selection.getRangeAt(0);

    setHighlightState(prev => ({
      ...prev,
      selectedText,
      selectedRange: range,
      showAnalysis: true,
      hasSelection: true,
      isLoading: true,
      error: null
    }));

    // Try to get pre-computed analysis first
    const precomputedAnalysis = getPrecomputedAnalysis(selectedText);
    
    if (precomputedAnalysis) {
      setHighlightState(prev => ({
        ...prev,
        analysis: precomputedAnalysis,
        isLoading: false
      }));
      return;
    }

    // Fallback to API call if no pre-computed data
    try {
      const response = await fetch('/api/grammatical-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: selectedText,
          lessonId
        }),
      });

      const data = await response.json();

      if (data.success) {
        setHighlightState(prev => ({
          ...prev,
          analysis: data.words,
          isLoading: false
        }));
      } else {
        setHighlightState(prev => ({
          ...prev,
          error: data.error || 'Analysis failed',
          isLoading: false
        }));
      }
    } catch (error) {
      setHighlightState(prev => ({
        ...prev,
        error: 'Failed to analyze text',
        isLoading: false
      }));
    }
  }, [getPrecomputedAnalysis, lessonId]);

  // Close analysis when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking on the text area, analysis panel, or highlight button
      const isClickInsideTextArea = textRef.current && textRef.current.contains(target);
      const isClickInsideAnalysisPanel = analysisRef.current && analysisRef.current.contains(target);
      const isClickOnHighlightButton = highlightButtonRef.current && highlightButtonRef.current.contains(target);
      
      if (!isClickInsideTextArea && !isClickInsideAnalysisPanel && !isClickOnHighlightButton) {
        setHighlightState(prev => ({ ...prev, showAnalysis: false, hasSelection: false }));
        window.getSelection()?.removeAllRanges();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply highlighting to selected text with individual word colors
  const applyHighlighting = useCallback(() => {
    console.log('applyHighlighting called', { 
      hasRange: !!highlightState.selectedRange, 
      hasAnalysis: !!highlightState.analysis,
      analysisLength: highlightState.analysis?.length 
    });

    if (!highlightState.selectedRange || !highlightState.analysis || highlightState.analysis.length === 0) {
      console.log('Early return - missing data');
      return;
    }

    const range = highlightState.selectedRange.cloneRange();
    const analysis = highlightState.analysis;
    
    try {
      // Get the selected text
      const selectedText = range.toString();
      console.log('Selected text:', selectedText);
      
      // Create highlighted HTML for each word
      let highlightedHTML = selectedText;
      
      // Sort analysis by word length (longest first) to avoid partial replacements
      const sortedAnalysis = [...analysis].sort((a, b) => b.word.length - a.word.length);
      
      sortedAnalysis.forEach(wordAnalysis => {
        const word = wordAnalysis.word;
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Create the highlighted span based on case or part of speech
        let spanClass = '';
        let title = '';
        
        if (wordAnalysis.case && caseColors[wordAnalysis.case]) {
          spanClass = `${caseColors[wordAnalysis.case]} border rounded px-1 mx-0.5`;
          title = `${wordAnalysis.lemma} (${wordAnalysis.case} ${wordAnalysis.number || ''} ${wordAnalysis.gender || ''})`.trim();
        } else if (partOfSpeechColors[wordAnalysis.partOfSpeech]) {
          spanClass = `${partOfSpeechColors[wordAnalysis.partOfSpeech]} border rounded px-1 mx-0.5`;
          title = `${wordAnalysis.lemma} (${wordAnalysis.partOfSpeech})`;
        }
        
        if (spanClass) {
          const highlightedWord = `<span class="${spanClass}" title="${title}">${word}</span>`;
          // Use more precise word boundary matching to avoid replacing partial words
          // Also escape special characters that might interfere with regex
          const regex = new RegExp(`\\b${escapedWord}\\b(?![^<]*>)`, 'g');
          const newHighlightedHTML = highlightedHTML.replace(regex, highlightedWord);
          
          // Only update if we actually made a replacement
          if (newHighlightedHTML !== highlightedHTML) {
            highlightedHTML = newHighlightedHTML;
            console.log(`Replaced word: ${word} with highlighted version`);
          }
        }
      });
      
      console.log('Highlighted HTML:', highlightedHTML);
      
      // Create a new span element with the highlighted content
      const span = document.createElement('span');
      span.innerHTML = highlightedHTML;
      
      // Replace the selected content with highlighted content
      range.deleteContents();
      range.insertNode(span);
      
      console.log('Highlighting applied successfully');
      
      // Clear selection and analysis after a small delay to ensure highlighting is visible
      setTimeout(() => {
        window.getSelection()?.removeAllRanges();
        setHighlightState(prev => ({ 
          ...prev, 
          showAnalysis: false, 
          hasSelection: false,
          selectedText: '',
          selectedRange: null,
          analysis: null
        }));
      }, 100);
      
    } catch (error) {
      console.error('Failed to apply highlighting:', error);
      // If highlighting fails, just close the analysis panel
      setHighlightState(prev => ({ 
        ...prev, 
        showAnalysis: false, 
        hasSelection: false,
        selectedText: '',
        selectedRange: null,
        analysis: null
      }));
    }
  }, [highlightState.selectedRange, highlightState.analysis]);

  const renderWordAnalysis = (word: WordAnalysis) => (
    <div key={word.word} className="mb-3 p-3 bg-gray-50 rounded border">
      <div className="font-semibold text-lg mb-2 flex items-center gap-2">
        <span className="text-blue-800">{word.word}</span>
        <span className="text-gray-600 text-sm">→</span>
        <span className="text-green-800">{word.lemma}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="font-medium">Part of Speech:</span>
          <span className={`ml-2 px-2 py-1 rounded ${partOfSpeechColors[word.partOfSpeech]}`}>
            {word.partOfSpeech}
          </span>
        </div>
        
        {word.case && (
          <div>
            <span className="font-medium">Case:</span>
            <span className={`ml-2 px-2 py-1 rounded ${caseColors[word.case]}`}>
              {word.case}
            </span>
          </div>
        )}
        
        {word.number && (
          <div>
            <span className="font-medium">Number:</span>
            <span className="ml-2">{word.number}</span>
          </div>
        )}
        
        {word.gender && (
          <div>
            <span className="font-medium">Gender:</span>
            <span className="ml-2">{word.gender}</span>
          </div>
        )}
        
        {word.person && (
          <div>
            <span className="font-medium">Person:</span>
            <span className="ml-2">{word.person}</span>
          </div>
        )}
        
        {word.tense && (
          <div>
            <span className="font-medium">Tense:</span>
            <span className="ml-2">{word.tense}</span>
          </div>
        )}
        
        {word.voice && (
          <div>
            <span className="font-medium">Voice:</span>
            <span className="ml-2">{word.voice}</span>
          </div>
        )}
        
        {word.mood && (
          <div>
            <span className="font-medium">Mood:</span>
            <span className="ml-2">{word.mood}</span>
          </div>
        )}
      </div>
      
      {word.notes && (
        <div className="mt-2 text-sm text-gray-600 italic">
          <span className="font-medium">Notes:</span> {word.notes}
        </div>
      )}
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      {/* Main text area */}
      <div
        ref={textRef}
        className="select-text cursor-text leading-relaxed"
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
      >
        {text}
      </div>

      {/* Static Highlight Button - always visible when there's a selection */}
      {highlightState.hasSelection && highlightState.analysis && highlightState.analysis.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            ref={highlightButtonRef}
            onClick={applyHighlighting}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            ✨ Highlight Text
          </button>
        </div>
      )}

      {/* Analysis Panel at Bottom */}
      {highlightState.showAnalysis && (
        <div
          ref={analysisRef}
          className="mt-6 bg-white border border-gray-300 rounded-xl shadow-lg p-6"
        >
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 text-lg">
              Selected: &quot;{highlightState.selectedText}&quot;
            </h4>
          </div>

          {highlightState.isLoading && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Analyzing grammar...
            </div>
          )}

          {highlightState.error && (
            <div className="text-red-600 text-sm">
              Error: {highlightState.error}
            </div>
          )}

          {highlightState.analysis && highlightState.analysis.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {highlightState.analysis.map(renderWordAnalysis)}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <h5 className="font-semibold mb-2">Case Color Legend:</h5>
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(caseColors).map(([caseType, colorClass]) => (
            <span key={caseType} className={`px-2 py-1 rounded border ${colorClass}`}>
              {caseType}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Grammar mode active - select text to analyze Latin grammatical cases and forms
        </p>
      </div>
    </div>
  );
}
