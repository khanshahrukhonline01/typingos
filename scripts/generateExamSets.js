// Script to generate exam sets with difficulty levels
// Run with: node scripts/generateExamSets.js

const examTemplates = {
    'ssc-chsl': {
        topics: [
            { difficulty: 'easy', content: 'Government schemes and initiatives for public welfare' },
            { difficulty: 'medium', content: 'Administrative procedures and office management' },
            { difficulty: 'hard', content: 'Constitutional amendments and legal frameworks' },
        ]
    },
    'ssc-cgl': {
        topics: [
            { difficulty: 'easy', content: 'Basic government structure and functions' },
            { difficulty: 'medium', content: 'Tax administration and revenue collection' },
            { difficulty: 'hard', content: 'Economic policy and fiscal management' },
        ]
    },
    'rrb-ntpc': {
        topics: [
            { difficulty: 'easy', content: 'Railway passenger services and ticketing' },
            { difficulty: 'medium', content: 'Station operations and safety protocols' },
            { difficulty: 'hard', content: 'Railway infrastructure and modernization' },
        ]
    },
    'sbi-po': {
        topics: [
            { difficulty: 'easy', content: 'Basic banking services and accounts' },
            { difficulty: 'medium', content: 'Digital banking and payment systems' },
            { difficulty: 'hard', content: 'Banking regulations and monetary policy' },
        ]
    },
    'judiciary-india': {
        topics: [
            { difficulty: 'easy', content: 'Basic legal concepts and contracts' },
            { difficulty: 'medium', content: 'Fundamental rights and constitutional law' },
            { difficulty: 'hard', content: 'Complex legal precedents and judgments' },
        ]
    },
    'speed-drills-india': {
        topics: [
            { difficulty: 'hard', content: 'Special characters and symbols' },
            { difficulty: 'hard', content: 'Numbers and mixed alphanumeric' },
            { difficulty: 'hard', content: 'Code snippets and technical text' },
        ]
    }
};

console.log('Generated exam sets structure - integrate into examSetsData.ts');
