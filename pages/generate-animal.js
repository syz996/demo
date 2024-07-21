import { useState } from 'react';

export default function GenerateAnimal() {
  const [prompt, setPrompt] = useState('');
  const [animal, setAnimal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerate = async () => {
    if (!prompt) {
      alert('请输入提示文本');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/generate-animal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setAnimal(data.animal);
    } catch (error) {
      console.error('Error generating animal:', error);
      alert('生成随机动物时出错');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">输入提示文本生成随机动物</h1>
      <textarea
        value={prompt}
        onChange={handleInputChange}
        rows="4"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="请输入提示文本..."
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded "
      >
        {loading ? '生成中...' : '生成'}
      </button>
      {animal && <p className="mt-4">生成的随机动物是：{animal}</p>}
    </div>
  );
}
