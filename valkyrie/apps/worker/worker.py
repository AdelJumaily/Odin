"""Worker runner (RQ/Celery placeholder)."""
import time


def run():
    print("Worker started (placeholder)")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Worker stopped")


if __name__ == "__main__":
    run()
