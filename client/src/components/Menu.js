export default function Menu(props) {
  return (
    <ul className="Menu out-right">
      <li onClick={props.signout}>sign out</li>
      <li onClick={props.deleteAccount}>delete account</li>
    </ul>
  );
}
