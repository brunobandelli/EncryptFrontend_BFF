import { CryptoProvider } from './context/CryptoProvider';
import CryptoFormEncrypt from './Forms/CryptoFormEncrypt';
import CryptoFormDecrypt from './Forms/CryptoFormDecrypt';
import styles from './CryptoApp.module.scss';

export default function CryptoApp() {
  return (
    <CryptoProvider>
      <div className={styles.container}>
        <h1>Crypto Frontend BFF</h1>
        <div className={styles.sideBySide}>
          <div className={styles.section}>
            <h2>Criptografar</h2>
            <CryptoFormEncrypt />
          </div>
          <div className={styles.section}>
            <h2>Descriptografar</h2>
            <CryptoFormDecrypt />
          </div>
        </div>
      </div>
    </CryptoProvider>
  );
}
