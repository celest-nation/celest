import Game from '../components/Game.tsx';
import { ToastContainer } from 'react-toastify';
import { useState, useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import InteractButton from '../components/buttons/InteractButton.tsx';
import { MAX_HUMAN_PLAYERS } from '../../convex/constants.ts';
import { Link } from 'react-router-dom';
import { sound } from '@pixi/sound';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

function SoundToggle() {
  const musicUrl = useQuery(api.music.getBackgroundMusic);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    if (musicUrl) {
      sound.add('background', musicUrl).loop = true;
    }
  }, [musicUrl]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      sound.stop('background');
    } else {
      await sound.play('background');
    }
    setPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') void toggle();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggle]);

  return (
    <button onClick={() => void toggle()} className="sim-icon-btn" title="Toggle music (M)">
      {isPlaying ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}

function HelpButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="sim-icon-btn" title="Help">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </button>
      <ReactModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={modalStyles}
        contentLabel="Help"
        ariaHideApp={false}
      >
        <div className="sim-help-modal">
          <div className="sim-help-header">
            <h2>How it works</h2>
            <button onClick={() => setOpen(false)} className="sim-help-close">
              &times;
            </button>
          </div>
          <div className="sim-help-body">
            <p>
              <strong>Spectate</strong> — Click and drag to move around. Scroll to zoom. Click any
              agent to see their conversation history.
            </p>
            <p>
              <strong>Interact</strong> — Press the <em>Join Simulation</em> button to spawn your
              own character. Click to move, click an agent to start a conversation.
            </p>
            <p>
              Up to {MAX_HUMAN_PLAYERS} humans can participate at once. Idle players are removed
              after 5 minutes.
            </p>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default function SimulationPage() {
  return (
    <div className="sim-page">
      {/* Simulation container — top padding matches sides */}
      <div className="sim-container">
        <Game />
      </div>

      {/* Bottom bar: Celest logo, Join button, music + help */}
      <footer className="sim-footer">
        <div className="sim-footer-left">
          <Link to="/" className="sim-logo">
            CELEST
          </Link>
        </div>
        <div className="sim-footer-center">
          <InteractButton />
        </div>
        <div className="sim-footer-right">
          <SoundToggle />
          <HelpButton />
        </div>
      </footer>

      <ToastContainer position="bottom-right" autoClose={2000} closeOnClick theme="dark" />
    </div>
  );
}

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 50,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '480px',
    width: '90%',
    border: 'none',
    borderRadius: '16px',
    background: '#ffffff',
    color: '#1a1a1a',
    padding: '0',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
};
