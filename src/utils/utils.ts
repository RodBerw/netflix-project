export async function waitForSeconds(seconds: number, abort: AbortController) {
  return new Promise<void>((resolve, reject) => {
    console.log("Coroutine started");
    const timer = setTimeout(resolve, seconds * 1000);

    abort.signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Coroutine cancelled"));
    });
  });
}
