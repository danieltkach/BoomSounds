import React, { useEffect } from 'react';
import { useRef } from 'react';
import * as AiIcons from 'react-icons/ai';
import { connect } from 'react-redux';
import { changeStatus, setAudioUrl } from '../../redux/playPreview/actions';

const PlayPreview = ({ audioUrl, isPlaying }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else audioRef.current.pause();
  }, [isPlaying]);

  return <audio src={audioUrl} ref={audioRef}></audio>;
};

const mapStateToProps = (state) => {
  return {
    audioUrl: state.playReducer.audioUrl,
    isPlaying: state.playReducer.isPlaying,
  };
};

export default connect(mapStateToProps, { changeStatus, setAudioUrl })(
  PlayPreview
);
