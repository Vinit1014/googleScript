<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

file_put_contents(__DIR__ . '/debug.log', 
    "\n----New Request----\n" . 
    date('Y-m-d H:i:s') . "\n" . 
    "POST Data: " . print_r(file_get_contents('php://input'), true) . "\n" . 
    "Server Data: " . print_r($_SERVER, true) . "\n",
    FILE_APPEND
);

class WebhookHandler {
    private $logFile = __DIR__ . '/googleSheets.log';
    private $secretKey = '12345678';

    public function handleRequest() {

        $postData = json_decode(file_get_contents('php://input'), true);
        $this->writeToLog($postData, 'INCOMING POST REQUEST');
        
        if (!isset($postData['secret']) || $postData['secret'] !== $this->secretKey) {
            $this->writeToLog("Invalid secret key", 'AUTH ERROR');
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Invalid secret key']);
            return;
        }
        
        $cid = $postData['cid'];
        $value = $postData['value'];

        if ($cid === null || $value === null) {
            $this->writeToLog("Missing parameters", 'VALIDATION ERROR');
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Missing required parameters']);
            return;
        }

        $getData = [
            'cid' => $cid,
            'value' => $value,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        $this->writeToLog($getData, 'POST REQUEST DATA');

        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Data received and logged']);
    }
    
    public function writeToLog($data, $title = '') {
        $log = "\n------------------------\n";
        $log .= date("Y.m.d G:i:s") . "\n";
        $log .= (strlen($title) > 0 ? $title : 'DEBUG') . "\n";
        $log .= print_r($data, true);
        $log .= "\n------------------------\n";
        file_put_contents($this->logFile, $log, FILE_APPEND);
    }

    public function ensureLogFileExists() {
        if (!file_exists($this->logFile)) {
            touch($this->logFile);
            chmod($this->logFile, 0666);
        }
    }
}

try {
    $handler = new WebhookHandler();
    $handler->ensureLogFileExists();
    $handler->handleRequest();
} catch (Exception $e) {
    $handler->writeToLog($e->getMessage(), 'ERROR');
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal server error']);
}
?>