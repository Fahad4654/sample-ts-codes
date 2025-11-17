type PromptFormat = (template: string, data: Record<string, string>) => string;

const createPromptFormatter = (
  formatter: (template: string, data: Record<string, string>) => string
): PromptFormat => formatter;

const basicFormatter = createPromptFormatter((template, data) => {
  let formatted = template;
  for (const key in data) {
    formatted = formatted.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g"), data[key]);
  }
  return formatted;
});

const exampleTemplate = "The {{ animal }} says {{ sound }}.";
const exampleData = { animal: "dog", sound: "woof" };
const formattedPrompt = basicFormatter(exampleTemplate, exampleData);

console.log(formattedPrompt);

export { createPromptFormatter, basicFormatter };