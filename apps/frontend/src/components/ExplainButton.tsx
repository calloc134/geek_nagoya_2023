import { useState } from 'react';
import { InfoCircle, X } from 'tabler-icons-react'; // Xアイコンをインポート
import { css } from "src/lib/styled-system/css";

const HelpButton = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHelp(true)} style={{
          fontSize: '16px',
          padding: 1,
          margin: 1,
      }}>
        <InfoCircle
          size={32}
          strokeWidth={2.5}
          className={css({
            color: "gray.1",
          })}
        />
      </button>
      {showHelp && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            zIndex: 999,
          }} />
          <div style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)', // 中心に移動
            width: '50%',
            backgroundColor: 'white',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            padding: '40px',
            zIndex: 1000,
          }}>
            <button onClick={() => setShowHelp(false)} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}>
              <X size={24} />
            </button>
            <p style={{ fontSize: '18px' }}>使い方: 画像をアップロードした後にカメラから表情を撮影してください。</p>
          </div>
        </>
      )}
    </div>
  );
};

export default HelpButton;
