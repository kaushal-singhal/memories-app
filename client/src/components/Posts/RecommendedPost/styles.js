import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    width: '260px',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: '0.3s',
    overflow: 'hidden',

    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
    },
  },

  media: {
    height: 160,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontWeight: 600,
    wordBreak: 'break-word',
  },

  message: {
    marginTop: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-word',
  },

  likes: {
    marginTop: '12px',
    fontWeight: 500,
  },
}));