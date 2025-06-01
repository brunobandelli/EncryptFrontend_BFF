import { useContext } from 'react';
import  CryptoContext  from '../context/CryptoContext';
import styles from '../CryptoApp.module.scss';

export default function CryptoFormEncrypt() {
  const {
    plainText,
    setPlainText,
    encryptedData,
    setEncryptedData,
    key,
    setKey,
    iv,
    setIv,
    hmac,
    setHmac,
    encryptMessage,
    setEncryptMessage,
    setEncryptedInput,
    setKeyInput,
    setIvInput,
    setHmacInput,
    setDecryptedText,
    setDecryptMessage,
  } = useContext(CryptoContext);

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
    setDecryptMessage('');

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

  return (
    <section className={styles.section}>
      <textarea
        rows="4"
        placeholder="Digite o texto para criptografar"
        value={plainText}
        onChange={(e) => setPlainText(e.target.value)}
        className={styles.textarea}
      />
      <button onClick={handleEncrypt} className={styles.button}>
        Criptografar
      </button>

      {encryptedData && (
        <div className={styles.result}>
          <h3>Resultado da Criptografia:</h3>
          <p><strong>Encrypted Data:</strong> {encryptedData}</p>
          <p><strong>Key:</strong> {key}</p>
          <p><strong>IV:</strong> {iv}</p>
          <p><strong>HMAC:</strong> {hmac}</p>
        </div>
      )}

      {encryptMessage && (
        <div
          className={`${styles.message} ${
            encryptMessage.includes('sucesso') ? styles.success : styles.error
          }`}
        >
          <strong>{encryptMessage}</strong>
        </div>
      )}
    </section>
  );
}
