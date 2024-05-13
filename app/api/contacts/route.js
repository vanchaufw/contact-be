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

export const POST = async (req) => {
  if (req.method === "OPTIONS") {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    return new Response(null, { status: 200, headers });
  }

  try {
    const { id, fullname, phone, email } = await req.json();
    if (!id || !fullname || !phone || !email) {
      return new Response(JSON.stringify({ msg: "Empty field" }), {
        status: 404,
        headers,
      });
    }
    await excuteQuery({
      query: "INSERT INTO contact (id, fullname, phone, email) VALUES (?, ?, ?, ?);",
      values: [id, fullname, phone, email],
    });
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    return new Response(JSON.stringify({ msg: "Created" }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something wrong in server" }),
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  if (req.method === "OPTIONS") {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    return new Response(null, { status: 200, headers });
  }

  try {
    const { id, fullname, phone } = await req.json();
    if (!id || !fullname || !phone) {
      return new Response(JSON.stringify({ msg: "Empty field" }), {
        status: 404,
        headers,
      });
    }
    await excuteQuery({
      query: "UPDATE contact SET fullname=?, phone=? WHERE id=?",
      values: [fullname, phone, id],
    });
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    return new Response(JSON.stringify({ msg: "Updated" }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something wrong in server" }),
      { status: 500 }
    );
  }
};

