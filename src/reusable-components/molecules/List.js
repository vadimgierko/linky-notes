import Card from "./Card";

// TO DO: CARD MUST BE A PASSED PROP TO DO LIST FLEXIBLE & CUSTOMISABLE !!!

export default function List({ items, renderComponent }) {
	if (!items || !Object.entries(items).length)
		return (
			<p className="list">
				There are no items in the list or the're loading now...
			</p>
		);

	return (
		<ul style={{ listStyle: "none" }}>
			{Object.keys(items).map((key) => (
				<li key={key}>
					{renderComponent === "card" ? (
						<Card
							item={items[key]}
							itemKey={key}
							body={
								<>
									{Object.keys(items[key]).map((subkey) => {
										return typeof items[key][subkey] === "string" ? (
											<p key={subkey}>
												<strong>{subkey}</strong>: {items[key][subkey]}
											</p>
										) : (
											<div key={subkey}>
												<p>
													<strong>{subkey}</strong>:
												</p>
												{Object.keys(items[key][subkey]).map((subsubkey) => (
													<p key={subsubkey} className="ms-3">
														<strong>{subsubkey}</strong>:{" "}
														{items[key][subkey][subsubkey]}
													</p>
												))}
											</div>
										);
									})}
								</>
							}
						/>
					) : (
						items[key]
					)}
				</li>
			))}
		</ul>
	);
}
