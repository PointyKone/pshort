import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query["slug"];

	if (!slug || typeof slug !== "string") {
		res.status(404);
		res.send(JSON.stringify({ message: "No slug provided." }));
		return;
	}

	const data = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug
			}
		}
	})

	if (!data) {
		res.status(404);

		// res.setHeader("Content-Type", "application/json");
		// res.setHeader("Access-Control-Allow-Origin", "*");
		// res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");

		res.send(JSON.stringify({ message: "Slug not found." }));
		return;
	}

	return res.json(data);
}