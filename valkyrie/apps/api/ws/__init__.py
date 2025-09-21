from fastapi import WebSocket


class EventHub:
    def __init__(self):
        self._clients = set()

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self._clients.add(ws)

    def disconnect(self, ws: WebSocket):
        self._clients.discard(ws)

    async def broadcast(self, message: str):
        for ws in list(self._clients):
            try:
                await ws.send_text(message)
            except Exception:
                self._clients.discard(ws)
