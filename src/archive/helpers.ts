// Helper function to create realistic options for calculation questions
export const createNumericOptions = (correctAnswer: number, range = 5, count = 4): { A: string; B: string; C: string; D: string; } => {
  const options: Set<number> = new Set([correctAnswer]);
  
  // Generate distractors until we have enough
  let attempts = 0;
  while (options.size < count && attempts < 100) {
      const randomOffset = (Math.floor(Math.random() * range) + 1) * (Math.random() < 0.5 ? -1 : 1);
      const newOption = correctAnswer + randomOffset;
      
      if (newOption >= 0) {
        options.add(newOption);
      }
      attempts++;
  }

  // If random generation fails, add sequential distractors
  let fallback = 1;
  while (options.size < count) {
      const nextOptionUp = correctAnswer + fallback;
      if (options.size < count) options.add(nextOptionUp);
      
      const nextOptionDown = correctAnswer - fallback;
      if (options.size < count && nextOptionDown >= 0) options.add(nextOptionDown);
      fallback++;
  }

  const optionsArray = Array.from(options);
  
  // Shuffle the options to randomize the position of the correct answer
  for (let i = optionsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
  }
  
  const finalOptions = optionsArray.slice(0, count);

  // This safeguard ensures exactly 'count' options are always returned.
  while (finalOptions.length < count) {
    finalOptions.push(correctAnswer + 10 + finalOptions.length);
  }

  return {
    A: String(finalOptions[0]),
    B: String(finalOptions[1]),
    C: String(finalOptions[2]),
    D: String(finalOptions[3]),
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