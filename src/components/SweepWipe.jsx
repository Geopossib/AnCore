export default function SweepWipe({ active }) {
  return <div className={`sweep-wipe${active ? ' sweep-active' : ''}`} aria-hidden="true" />;
}
