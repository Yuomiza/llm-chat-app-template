export default {
  async fetch(request) {
    // Разрешаем CORS (если запрос идёт из браузера)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Обработка OPTIONS-запроса (для CORS)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Если это POST-запрос
    if (request.method === "POST") {
      try {
        const data = await request.json(); // Получаем тело запроса
        console.log("Получен запрос:", data);

        // Формируем ответ (можно добавить логику нейросети)
        const responseData = {
          success: true,
          message: "Запрос успешно обработан!",
          your_data: data, // Эхо-ответ (возвращаем то, что прислали)
          generated_text: "Этот текст могла бы сгенерировать нейросеть...",
        };

        // Возвращаем JSON-ответ
        return new Response(JSON.stringify(responseData), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        // Ошибка парсинга JSON
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      }
    }

    // Если метод не POST
    return new Response(
      JSON.stringify({ error: "Используйте POST-запрос!" }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  },
};
