import { useState } from 'react';
import CryptoContext from './CryptoContext';

export function CryptoProvider({ children }) {
  const [plainText, setPlainText] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [hmac, setHmac] = useState('');
  const [encryptedInput, setEncryptedInput] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [ivInput, setIvInput] = useState('');
  const [hmacInput, setHmacInput] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [encryptMessage, setEncryptMessage] = useState('');
  const [decryptMessage, setDecryptMessage] = useState('');

  return (
    <CryptoContext.Provider
      value={{
        plainText, setPlainText,
        encryptedData, setEncryptedData,
        key, setKey,
        iv, setIv,
        hmac, setHmac,
        encryptedInput, setEncryptedInput,
        keyInput, setKeyInput,
        ivInput, setIvInput,
        hmacInput, setHmacInput,
        decryptedText, setDecryptedText,
        encryptMessage, setEncryptMessage,
        decryptMessage, setDecryptMessage,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
