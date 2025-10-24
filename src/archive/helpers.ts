// Helper function to create realistic options for calculation questions
export const createNumericOptions = (correctAnswer: number, range = 5, count = 4): { A: string; B: string; C: string; D: string; } => {
  const options: number[] = [correctAnswer];
  // Ensure the range is at least 1 to avoid infinite loops
  const step = Math.max(1, Math.floor(Math.random() * range) + 1);

  // Generate distractors
  while (options.length < count) {
    const randomFactor = Math.random() < 0.5 ? -1 : 1;
    let newOption = correctAnswer + (randomFactor * step * (options.length)); // Vary the distance
    if (newOption < 0) newOption = correctAnswer + options.length; // Avoid negative numbers for simple cases
    
    // Final check for uniqueness and non-negativity and not being too close
    const uniqueAndNotTooClose = !options.includes(newOption) && newOption >= 0 && Math.abs(newOption - correctAnswer) > 0;
    
    if (uniqueAndNotTooClose) {
      options.push(newOption);
    } else {
       // If a duplicate is generated, try a slightly different value
       options.push(correctAnswer + options.length + (Math.floor(Math.random() * 3) + 1));
    }
  }

  // Final check for uniqueness before returning
  const uniqueOptions = [...new Set(options)];
  while(uniqueOptions.length < count) {
    uniqueOptions.push(correctAnswer + 10 + uniqueOptions.length);
  }


  // Shuffle the options to randomize position of the correct answer
  for (let i = uniqueOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueOptions[i], uniqueOptions[j]] = [uniqueOptions[j], uniqueOptions[i]];
  }

  return {
    A: String(uniqueOptions[0]),
    B: String(uniqueOptions[1]),
    C: String(uniqueOptions[2]),
    D: String(uniqueOptions[3]),
  };
};

export const numberToWordsTr = (num: number): string => {
    if (num === 0) return "sıfır";
    
    const birler = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
    const onlar = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];

    const processGroup = (n: number) => {
        if (n === 0) return "";
        const yuzlerBas = Math.floor(n / 100);
        const onlarBas = Math.floor((n % 100) / 10);
        const birlerBas = n % 10;
        let str = "";
        if (yuzlerBas > 0) {
            str += (yuzlerBas === 1 ? "yüz" : birler[yuzlerBas] + " yüz");
        }
        if (onlarBas > 0) {
            str += " " + onlar[onlarBas];
        }
        if (birlerBas > 0) {
            str += " " + birler[birlerBas];
        }
        return str.trim();
    };

    const milyonlar = Math.floor(num / 1000000);
    const binler = Math.floor((num % 1000000) / 1000);
    const birlerGrubu = num % 1000;

    let result = "";
    if (milyonlar > 0) {
        result += processGroup(milyonlar) + " milyon ";
    }
    if (binler > 0) {
        if (binler === 1) result += "bin ";
        else result += processGroup(binler) + " bin ";
    }
    if (birlerGrubu > 0) {
        result += processGroup(birlerGrubu);
    }

    return result.trim();
};
