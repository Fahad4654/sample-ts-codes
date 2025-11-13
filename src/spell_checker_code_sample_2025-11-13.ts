interface Suggestion {
    word: string;
    distance: number;
}

class SpellChecker {
    private dictionary: Set<string>;

    constructor(words: string[]) {
        this.dictionary = new Set(words);
    }

    private distance(a: string, b: string): number {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        const matrix: number[][] = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));

        for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
        for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1, // Deletion
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j - 1] + cost  // Substitution
                );
            }
        }
        return matrix[a.length][b.length];
    }

    check(word: string, maxDistance: number = 2): string | null {
        if (this.dictionary.has(word)) {
            return word;
        }

        let closest: Suggestion[] = [];
        this.dictionary.forEach(dictWord => {
            const dist = this.distance(word, dictWord);
            if (dist <= maxDistance) {
                closest.push({ word: dictWord, distance: dist });
            }
        });

        closest.sort((a, b) => a.distance - b.distance);

        return closest.length > 0 ? closest[0].word : null;
    }
}

export { SpellChecker };