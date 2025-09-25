export function chatFySignupEmail(name, url) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to Chat_Fy</title>
    <style>
      body {
        background-color: #f4f7fa;
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 40px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      }
      h1 {
        color: #2c3e50;
        text-align: center;
      }
      p {
        color: #555;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        background-color: #4A90E2;
        color: #ffffff !important;
        padding: 14px 28px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        margin: 20px 0;
      }
      .footer {
        font-size: 12px;
        color: #888;
        text-align: center;
        margin-top: 30px;
      }
      a.link {
        color: #4A90E2;
        word-break: break-all;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to <span style="color:#4A90E2;">Chat_Fy</span>, ${name}!</h1>
      <p>
        Thanks for signing up for <strong>Chat_Fy</strong> – your new space to connect, share,
        and chat with friends in real time.
      </p>
      <p>
        To complete your signup, please confirm your email address by clicking the button below:
      </p>
      <p style="text-align:center;">
        <a class="button" href="${url}" target="_blank" rel="noopener">Open Chat_Fy</a>
      </p>
      
      <p>
        We can’t wait to see you inside Chat_Fy and start the conversation! 🎉
      </p>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Chat_Fy. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

export default chatFySignupEmail;
