import React, { useState, useEffect } from 'react';

const EncryptionPlaceholder = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const encryptedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const targetText = text;

  useEffect(() => {
    if (!isDecrypting) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= targetText.length) {
          setIsDecrypting(false);
          return prev;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isDecrypting, targetText.length]);

  useEffect(() => {
    if (isDecrypting) {
      setDisplayText(
        targetText.slice(0, currentIndex) +
        Array.from({ length: targetText.length - currentIndex }, () => 
          encryptedChars[Math.floor(Math.random() * encryptedChars.length)]
        ).join('')
      );
    }
  }, [currentIndex, isDecrypting, targetText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDecrypting(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={className}>
      {isDecrypting ? displayText : targetText}
    </span>
  );
};

export default EncryptionPlaceholder;
