import { useState } from "react";
interface Props {
  member: number;
  setMember: (value: number) => void;
}
export default function JoinButton({ member, setMember }: Props) {
  const [join, setJoin] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (join === false) {
            setJoin(true);
            setMember(member + 1);
          } else if (join === true && member > 1) {
            setJoin(false);
            setMember(member - 1);
          }
        }}
      >
        <p className="btnText">{join ? "Joined" : "Join"}</p>
      </button>
    </>
  );
}


