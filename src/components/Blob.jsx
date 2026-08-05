export default function Blob({ className = '', style = {} }) {
  return <div className={`blob ${className}`} style={style} aria-hidden="true" />;
}
