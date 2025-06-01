import React, { useState } from 'react';

export default function CryptoApp() {
  const [plainText, setPlainText] = useState('');

  // Estado fixo recebido do backend, só atualizados no encrypt
  const [encryptedData, setEncryptedData] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [hmac, setHmac] = useState('');

  // Estado dos inputs editáveis na descriptografia
  const [encryptedInput, setEncryptedInput] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [ivInput, setIvInput] = useState('');
  const [hmacInput, setHmacInput] = useState('');

  const [decryptedText, setDecryptedText] = useState('');
  const [encryptMessage, setEncryptMessage] = useState('');
  const [decryptMessage, setDecryptMessage] = useState('');

  const handleEncrypt = async () => {
    if (!plainText.trim()) {
      setEncryptMessage('Por favor, insira um texto para criptografar.');
      setEncryptedData('');
      setEncryptedInput('');
      setKey('');
      setKeyInput('');
      setIv('');
      setIvInput('');
      setHmac('');
      setHmacInput('');
      return;
    }

    setEncryptMessage('');
    setDecryptedText('');
    setDecryptMessage(''); // limpa mensagens da seção de decrypt

    try {
      const response = await fetch('/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: plainText }),
      });

      const data = await response.json();

      if (!response.ok) {
        setEncryptMessage(data.error || 'Erro ao criptografar.');
        setEncryptedData('');
        setEncryptedInput('');
        setKey('');
        setKeyInput('');
        setIv('');
        setIvInput('');
        setHmac('');
        setHmacInput('');
        return;
      }

      // Atualiza estados fixos e editáveis com dados do backend
      setEncryptedData(data.encryptedData);
      setEncryptedInput(data.encryptedData);

      setKey(data.key);
      setKeyInput(data.key);

      setIv(data.iv);
      setIvInput(data.iv);

      setHmac(data.hmac);
      setHmacInput(data.hmac);

      setEncryptMessage('Texto criptografado com sucesso!');
    } catch {
      setEncryptMessage('Erro na conexão com o servidor.');
      setEncryptedData('');
      setEncryptedInput('');
      setKey('');
      setKeyInput('');
      setIv('');
      setIvInput('');
      setHmac('');
      setHmacInput('');
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedInput || !keyInput || !ivInput || !hmacInput) {
      setDecryptMessage('Preencha todos os campos para descriptografar.');
      setDecryptedText('');
      return;
    }

    setDecryptMessage('');
    setEncryptMessage(''); // limpa mensagens da seção de encrypt

    try {
      const response = await fetch('/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          encryptedData: encryptedInput,
          key: keyInput,
          iv: ivInput,
          hmac: hmacInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setDecryptMessage(data.error || 'Erro ao descriptografar.');
        setDecryptedText('');
        return;
      }

      setDecryptedText(data.text);
      setDecryptMessage('Texto descriptografado com sucesso!');
    } catch {
      setDecryptMessage('Erro na conexão com o servidor.');
      setDecryptedText('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif', }}>
      <h1>Crypto Frontend BFF</h1>

      <section>
        <h2>Criptografar</h2>
        <textarea
          rows="4"
          placeholder="Digite o texto para criptografar"
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button onClick={handleEncrypt} style={{ marginTop: '0.5rem'}}>Criptografar</button>

        {encryptedData && (
          <div style={{ marginTop: '1rem', wordBreak: 'break-word' }}>
            <h3>Resultado da Criptografia:</h3>
            <p><strong>Encrypted Data:</strong> {encryptedData}</p>
            <p><strong>Key:</strong> {key}</p>
            <p><strong>IV:</strong> {iv}</p>
            <p><strong>HMAC:</strong> {hmac}</p>
          </div>
        )}

        {encryptMessage && (
          <div style={{ marginTop: '1rem', color: encryptMessage.includes('sucesso') ? 'green' : 'red' }}>
            <strong>{encryptMessage}</strong>
          </div>
        )}
      </section>

      <hr style={{ margin: '2rem 0' }} />

      <section>
        <h2>Descriptografar</h2>
        <textarea
          rows="3"
          placeholder="Cole o texto criptografado aqui"
          value={encryptedInput}
          onChange={(e) => setEncryptedInput(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Chave (key)"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Vetor de Inicialização (IV)"
          value={ivInput}
          onChange={(e) => setIvInput(e.target.value)}
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="HMAC"
          value={hmacInput}
          onChange={(e) => setHmacInput(e.target.value)}
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}
        />
        <button onClick={handleDecrypt} style={{ marginTop: '0.5rem' }}>Descriptografar</button>

        {decryptedText && (
          <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', backgroundColor: '#000000', padding: '1rem', color: '#fff' }}>
            <h3>Texto Descriptografado:</h3>
            <p>{decryptedText}</p>
            <p style={{ color: 'lightgreen', marginTop: '1rem' }}>
              <strong>Texto descriptografado com sucesso!</strong>
            </p>
          </div>
        )}

        {decryptMessage && !decryptedText && (
          <div style={{ marginTop: '1rem', color: 'red' }}>
            <strong>{decryptMessage}</strong>
          </div>
        )}
      </section>
    </div>
  );
}
