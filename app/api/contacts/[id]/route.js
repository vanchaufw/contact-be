import excuteQuery from "../../lib/connectDb";

export const GET = async (req, res) => {
  try {
    const { id } = await res.params;
    const result = await excuteQuery({
      query: "SELECT * FROM contact WHERE id = ?",
      values: [id],
    });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Something wrong in server", { status: 500 });
  }
};

export const DELETE = async (req, res) => {
  try {
    const { id } = await res.params;

    await excuteQuery({
      query: "DELETE FROM contact WHERE id = ?",
      values: [id],
    });

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    return new Response(JSON.stringify({ msg: "Deleted" }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
