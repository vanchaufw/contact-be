import excuteQuery from "../lib/connectDb";

export const GET = async (req) => {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM contact",
    });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Something wrong in server", { status: 500 });
  }
};

export const POST = async (req, res) => {
  try {
    const { id, fullname, phone } = await req.json();
    await excuteQuery({
      query: "INSERT INTO contact (id, fullname, phone) VALUES (?, ?, ?);",
      values: [id, fullname, phone],
    });
    return new Response(JSON.stringify({ msg: "Success" }), { status: 200 });
  } catch (error) {}
};
