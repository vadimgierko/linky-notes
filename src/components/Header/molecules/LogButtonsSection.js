import LogButton from "../atoms/LogButton";

export default function LogButtonsSection({
	user,
	isNavCollapsed,
	onLogButtonClick,
}) {
	if (!user.id)
		return (
			<div className="log-buttons-section">
				<LogButton
					link="/signin"
					logButtonText="Sign In"
					className={
						isNavCollapsed
							? "btn btn-outline-success me-2"
							: "btn btn-outline-success d-block mt-2"
					}
					handleLogButtonClick={onLogButtonClick}
				/>
				<LogButton
					link="/signup"
					logButtonText="Sign Up"
					className={
						isNavCollapsed
							? "btn btn-outline-info me-2"
							: "btn btn-outline-info d-block mt-2"
					}
					handleLogButtonClick={onLogButtonClick}
				/>
			</div>
		);

	return (
		<div className="log-buttons-sections">
			<LogButton
				link="/about"
				logButtonText="Log out"
				className={
					isNavCollapsed
						? "btn btn-outline-danger me-2"
						: "btn btn-outline-danger d-block mt-2"
				}
				handleLogButtonClick={onLogButtonClick}
			/>
		</div>
	);
}
