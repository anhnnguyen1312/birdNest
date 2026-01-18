export default async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) {
  // gửi cookie HttpOnly tự động
  let res = await fetch(url, { ...options, credentials: "include" });

  // nếu access token hết hạn
  if (res.status === 401) {
    console.log("res 401 nè", res);
    const refreshRes = await fetch("/api/auth-backend/refresh", {
      method: "POST",
      credentials: "include", // gửi cookie refresh token
    });
    console.log("refreshRes nè", refreshRes);

    if (refreshRes.ok) {
      // refresh thành công → retry request gốc
      console.log("refreshRes thành công", refreshRes);

      res = await fetch(url, { ...options, credentials: "include" });
    } else {
      // refresh thất bại → bắt login lại
      throw new Error("Session expired, please login again");
    }
  }

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res;
}
