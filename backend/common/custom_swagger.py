import json
from typing import Any

from fastapi.encoders import jsonable_encoder
from fastapi.openapi.docs import swagger_ui_default_parameters
from starlette.responses import HTMLResponse


def get_swagger_ui_html(  # noqa: PLR0913
    *,
    openapi_url: str,
    title: str,
    swagger_js_url: str = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js',
    swagger_css_url: str = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css',
    swagger_custom_css_url: str | None = None,
    swagger_favicon_url: str = 'https://fastapi.tiangolo.com/img/favicon.png',
    oauth2_redirect_url: str | None = None,
    init_oauth: dict[str, Any] | None = None,
    swagger_ui_parameters: dict[str, Any] | None = None,
) -> HTMLResponse:
    current_swagger_ui_parameters = swagger_ui_default_parameters.copy()
    if swagger_ui_parameters:
        current_swagger_ui_parameters.update(swagger_ui_parameters)

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
    <link type="text/css" rel="stylesheet" href="{swagger_css_url}">
    """

    if swagger_custom_css_url:
        html += f"""
        <link type="text/css" rel="stylesheet" href="{swagger_custom_css_url}">
        """

    html += f"""
    <link rel="shortcut icon" href="{swagger_favicon_url}">
    <title>{title}</title>
    </head>
    <body>
    <div id="swagger-ui">
    </div>
    <script src="{swagger_js_url}"></script>
    <!-- `SwaggerUIBundle` is now available on the page -->
    <script>
    const ui = SwaggerUIBundle({{
        url: '{openapi_url}',
    """

    for key, value in current_swagger_ui_parameters.items():
        html += f'{json.dumps(key)}: {json.dumps(jsonable_encoder(value))},\n'

    if oauth2_redirect_url:
        html += f"oauth2RedirectUrl: window.location.origin + '{oauth2_redirect_url}',"

    html += """
    presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
    })"""

    if init_oauth:
        html += f"""
        ui.initOAuth({json.dumps(jsonable_encoder(init_oauth))})
        """

    html += """
    </script>
    </body>
    </html>
    """
    return HTMLResponse(html)
