import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAvatar from "../components/UserAvatar";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="card flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <UserAvatar name={user?.name} size={88} />
        <dl className="space-y-3">
          <div><dt className="text-xs text-slate-500">Name</dt><dd className="text-lg font-medium">{user?.name}</dd></div>
          <div><dt className="text-xs text-slate-500">Email</dt><dd>{user?.email}</dd></div>
        </dl>
      </div>
      <button className="btn" onClick={() => navigate("/")}>Back to dashboard</button>
    </div>
  );
}
