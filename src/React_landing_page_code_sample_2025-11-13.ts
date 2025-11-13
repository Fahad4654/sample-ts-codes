//LandingPage.tsx
import React, { useState } from 'react';

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  { title: 'Feature 1', description: 'Amazing feature 1 description.' },
  { title: 'Feature 2', description: 'Incredible feature 2 functionality.' },
  { title: 'Feature 3', description: 'Outstanding feature 3 benefits.' },
];

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <div className="container">
      <header>
        <h1>Welcome to Our Awesome Product</h1>
        <p>Discover a new way to do things.</p>
      </header>

      <section className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="cta">
        <h2>Ready to get started?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2023 My Company</p>
      </footer>

      <style jsx>{`
        .container {
          font-family: sans-serif;
          text-align: center;
          padding: 20px;
        }

        header {
          margin-bottom: 30px;
        }

        .features {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
        }

        .feature-item {
          width: 30%;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .cta input {
          padding: 10px;
          margin-right: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .cta button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;