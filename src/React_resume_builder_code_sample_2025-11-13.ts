import React, { useState } from 'react';

interface ResumeSection {
  title: string;
  content: string;
}

const ResumeBuilder: React.FC = () => {
  const [sections, setSections] = useState<ResumeSection[]>([
    { title: 'Summary', content: '' },
    { title: 'Experience', content: '' },
    { title: 'Education', content: '' },
    { title: 'Skills', content: '' },
  ]);

  const handleSectionChange = (index: number, content: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], content };
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { title: 'New Section', content: '' }]);
  };

  return (
    <div>
      <h1>Resume Builder</h1>
      {sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <textarea
            value={section.content}
            onChange={(e) => handleSectionChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={addSection}>Add Section</button>
      <hr />
      <h2>Resume Preview</h2>
      {sections.map((section, index) => (
        <div key={index}>
          <h3>{section.title}</h3>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ResumeBuilder;