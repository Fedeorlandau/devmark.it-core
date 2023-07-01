import Badge from "@/components/Badge";
import { MemberInfo } from "@/types/index";

interface MembersProps {
  members?: MemberInfo[];
}

function Members({ members }: MembersProps) {
  return (
    <div className="my-6 text-black dark:text-white">
      <h2 className="text-xl md:text-3xl  font-bold leading-tight">
        Team members ({members?.length})
      </h2>
      <ul className="flex py-4 pl-2 flex-col list-disc ml-3">
        {members?.map((member) => (
          <li key={member.clientId}>
            <p>
              {member.name}
              {member.participant === "Voter" ? (
                <>
                  {" "}
                  -{" "}
                  <Badge type={member.voted ? "success" : "warning"}>
                    {member.voted ? "Voted" : "Pending"}
                  </Badge>
                </>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;
