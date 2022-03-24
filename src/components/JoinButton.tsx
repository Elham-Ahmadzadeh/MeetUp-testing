interface Props {
  member: number;
  setMember: (value: number) => void;
  joined: boolean;
}
export default function JoinButton({ member, setMember, joined }: Props) {

  //localStorage.setItem('join', JSON.stringify(join));
  // member =  JSON.parse(localStorage.getItem('join') || '{}');
  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (joined) {
            setMember(member - 1);   
          } else {
            setMember(member + 1);  
          }
        }}
      >
        <p className="btnText">{joined ? "Joined" : "Join"}</p>
      </button>
    </>
  );
}
