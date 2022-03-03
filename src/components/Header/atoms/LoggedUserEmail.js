export default function LoggedUserEmail({ user }) {
	if (!user) return null;
	return <div className="text-muted me-3">{user.email}</div>;
}
