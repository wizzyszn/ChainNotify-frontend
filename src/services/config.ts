const baseUrl = "https://chain-notify-backend.onrender.com/api/v1";

const routeBaseUrl = {
    auth: `${baseUrl}/auth`,
    projects: `${baseUrl}/projects`,
    users: `${baseUrl}/users`,
    data: `${baseUrl}/projects`,
    report: `${baseUrl}/data`,
    wallet: `${baseUrl}/wallet`,
};

// Debug function to log request details
const logRequestDetails = (url: string, options: RequestInit) => {
    console.log("Request Details:", {
        url,
        method: options.method,
        credentials: options.credentials,
        headers: options.headers,
        cookies: document.cookie, // Logs client cookies
    });
};

// Helper function to generate options
const options = <T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    data?: T,
    formData?: FormData
): RequestInit => {
    const headers: HeadersInit = formData
        ? {}
        : {
              "Content-Type": "application/json",
          };

    const baseOptions: RequestInit = {
        method,
        headers,
        credentials: "include", // Always include cookies
    };

    if (method === "GET" || !data && !formData) {
        return baseOptions;
    }

    return {
        ...baseOptions,
        body: formData ? formData : JSON.stringify(data),
    };
};

// Request handler function
const requestHandler = async <T>(
    url: string,
    requestOptions: RequestInit
): Promise<T> => {
    // Log request details
    logRequestDetails(url, requestOptions);

    try {
        const response = await fetch(url, requestOptions);

        // Check for failed response
        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`Error ${response.status}: ${errorMsg}`);
        }

        // Handle different response types
        const contentType = response.headers.get("Content-Type");
        console.log("Response Content-Type:", contentType);

        if (contentType?.includes("application/json")) {
            return response.json();
        }

        if (
            contentType?.includes("text/csv") ||
            contentType?.includes("application/pdf") ||
            contentType?.includes(
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
        ) {
            return response.blob() as Promise<T>;
        }

        // Default to text if unknown type
        return (await response.text()) as unknown as T;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};

// URL generator function
const urlGenerator = (
    key: keyof typeof routeBaseUrl,
    path: string,
    param: string = ""
) => {
    return `${routeBaseUrl[key]}/${path}${param ? `/${param}` : ""}`;
};

export { urlGenerator, options, requestHandler };
