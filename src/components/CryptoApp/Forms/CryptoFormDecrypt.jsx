import { useContext } from 'react';
import  CryptoContext  from '../context/CryptoContext';
import styles from '../CryptoApp.module.scss';

export default function CryptoFormDecrypt() {
  const {
    encryptedInput,
    setEncryptedInput,
    keyInput,
    setKeyInput,
    ivInput,
    setIvInput,
    hmacInput,
    setHmacInput,
    decryptedText,
    setDecryptedText,
    decryptMessage,
    setDecryptMessage,
    setEncryptMessage,
  } = useContext(CryptoContext);

  const handleDecrypt = async () => {
    if (!encryptedInput || !keyInput || !ivInput || !hmacInput) {
      setDecryptMessage('Preencha todos os campos para descriptografar.');
      setDecryptedText('');
      return;
    }

    setDecryptMessage('');
    setEncryptMessage('');

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
    <section className={styles.section}>
      <textarea
        rows="3"
        placeholder="Cole o texto criptografado aqui"
        value={encryptedInput}
        onChange={(e) => setEncryptedInput(e.target.value)}
        className={styles.textarea}
      />
      <input
        type="text"
        placeholder="Chave (key)"
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Vetor de Inicialização (IV)"
        value={ivInput}
        onChange={(e) => setIvInput(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="HMAC"
        value={hmacInput}
        onChange={(e) => setHmacInput(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleDecrypt} className={styles.button}>
        Descriptografar
      </button>

      {decryptedText && (
        <div className={styles.decryptedResult}>
          <h3>Texto Descriptografado:</h3>
          <p>{decryptedText}</p>
          <p className={styles.success}>
            <strong>Texto descriptografado com sucesso!</strong>
          </p>
        </div>
      )}

      {decryptMessage && !decryptedText && (
        <div className={`${styles.message} ${styles.error}`}>
          <strong>{decryptMessage}</strong>
        </div>
      )}
    </section>
  );
}
