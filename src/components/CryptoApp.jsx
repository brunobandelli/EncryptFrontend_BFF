import React, { useState } from 'react';

export default function CryptoApp() {
  // Estados para texto simples e criptografado
  const [plainText, setPlainText] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [hmac, setHmac] = useState('');

  // Estado para texto descriptografado
  const [decryptedText, setDecryptedText] = useState('');

  // Estado para mensagens de erro ou sucesso
  const [message, setMessage] = useState('');

  // Função para criptografar
  const handleEncrypt = async () => {
    if (!plainText.trim()) {
      setMessage('Por favor, insira um texto para criptografar.');
      return;
    }
    setMessage('');

    try {
      const response = await fetch('/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: plainText }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || 'Erro ao criptografar.');
        return;
      }
      setEncryptedData(data.encryptedData);
      setKey(data.key);
      setIv(data.iv);
      setHmac(data.hmac);
      setMessage('Texto criptografado com sucesso!');
    } catch {
      setMessage('Erro na conexão com o servidor.');
    }
  };

  // Função para descriptografar
  const handleDecrypt = async () => {
    if (!encryptedData || !key || !iv || !hmac) {
      setMessage('Preencha todos os campos para descriptografar.');
      return;
    }
    setMessage('');

    try {
      const response = await fetch('/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedData, key, iv, hmac }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || 'Erro ao descriptografar.');
        return;
      }
      setDecryptedText(data.text);
      setMessage('Texto descriptografado com sucesso!');
    } catch {
      setMessage('Erro na conexão com o servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Criptografia AES-256-CTR</h1>

      <section>
        <h2>Criptografar</h2>
        <textarea
          rows="4"
          placeholder="Digite o texto para criptografar"
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button onClick={handleEncrypt} style={{ marginTop: '0.5rem' }}>Criptografar</button>

        {encryptedData && (
          <div style={{ marginTop: '1rem', wordBreak: 'break-word' }}>
            <h3>Resultado da Criptografia:</h3>
            <p><strong>Encrypted Data:</strong> {encryptedData}</p>
            <p><strong>Key:</strong> {key}</p>
            <p><strong>IV:</strong> {iv}</p>
            <p><strong>HMAC:</strong> {hmac}</p>
          </div>
        )}
      </section>

      <hr style={{ margin: '2rem 0' }} />

      <section>
        <h2>Descriptografar</h2>
        <textarea
          rows="3"
          placeholder="Cole o texto criptografado aqui"
          value={encryptedData}
          onChange={(e) => setEncryptedData(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Chave (key)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Vetor de Inicialização (IV)"
          value={iv}
          onChange={(e) => setIv(e.target.value)}
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="HMAC"
          value={hmac}
          onChange={(e) => setHmac(e.target.value)}
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
        />
        <button onClick={handleDecrypt} style={{ marginTop: '0.5rem' }}>Descriptografar</button>

        {decryptedText && (
          <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '1rem' }}>
            <h3>Texto Descriptografado:</h3>
            <p>{decryptedText}</p>
          </div>
        )}
      </section>

      {message && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          <strong>{message}</strong>
        </div>
      )}
    </div>
  );
}
