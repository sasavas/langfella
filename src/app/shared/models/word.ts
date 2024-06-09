export interface UserWord {
    text?: string;
    sourceLanguageCode?: string;
    targetLanguageCode?: string;
    translations?: string[];
    exampleSentence?: string;
    familiarityLevel?: string;
  }

  export interface TranslationResult {
    translatorName: string;
    translation: string;
  }
