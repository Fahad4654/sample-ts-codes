import React from 'react';

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    name: 'Project Alpha',
    description: 'Description of Project Alpha.',
    imageUrl: 'alpha.jpg',
    link: 'alpha.com',
  },
  {
    name: 'Project Beta',
    description: 'Description of Project Beta.',
    imageUrl: 'beta.jpg',
    link: 'beta.com',
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="project-card">
    <img src={project.imageUrl} alt={project.name} />
    <h3>{project.name}</h3>
    <p>{project.description}</p>
    <a href={project.link} target="_blank" rel="noopener noreferrer">
      View Project
    </a>
  </div>
);

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio">
      <h1>My Portfolio</h1>
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;