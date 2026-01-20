import { useEffect, useState } from "react";
import { Card, List, Typography, Empty, Tag, Space, Flex } from "antd";
import { HistoryOutlined, FileTextOutlined } from "@ant-design/icons";
import { useDocumentEngineStore } from "../editor/useDocumentEngineStore";
import { useDocumentContext } from "../context/documentContext";

const { Text, Paragraph } = Typography;

export default function HistoryPage() {
  const { currentDocument } = useDocumentContext();
  const { versions, historyPreviewHtml, docVer, selectedDocVer, loadVersionPreview, switchDocument } = useDocumentEngineStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentDocument) {
      const engine = currentDocument.engine;
      const docId = currentDocument.docId;
      switchDocument(docId, engine);
    }
  }, [currentDocument?.docId, switchDocument]);

  const handleVersionClick = async (engine: any, ver: number) => {
    setLoading(true);
    try {
      await loadVersionPreview(engine, ver);
    } finally {
      setLoading(false);
    }
  };

  if (!currentDocument) {
    return (
      <div style={{ padding: 24, height: "100vh", boxSizing: "border-box" }}>
        <Card style={{ height: "100%" }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="请先选择一个文档"
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, height: "calc(100vh - 48px)", boxSizing: "border-box" }}>
      <Card
        style={{ height: "100%" }}
        styles={{ body: { padding: 16, height: "calc(100% - 57px)", display: "flex", flexDirection: "column" } }}
      >
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <Space>
            <HistoryOutlined />
            <Text strong style={{ fontSize: 16 }}>历史版本</Text>
          </Space>
          <Text type="secondary">{currentDocument.title}</Text>
        </Flex>

        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          查看文档 <Text strong>{currentDocument.title}</Text> 的历史版本，点击左侧条目预览内容。
        </Paragraph>

        <Flex flex={1} gap={16} style={{ overflow: "hidden" }}>
          <Card
            title={
              <Flex align="center" gap={8}>
                <Text strong>版本列表</Text>
              </Flex>
            }
            style={{ width: 280, display: "flex", flexDirection: "column", overflow: "hidden" }}
            styles={{ header: { padding: "12px 16px" }, body: { flex: 1, overflow: "auto", padding: 8 } }}
          >
            {versions.length === 0 ? (
              <Empty description="暂无历史版本" />
            ) : (
              <List
                size="small"
                dataSource={versions}
                renderItem={(rev) => (
                  <List.Item
                    onClick={() => handleVersionClick(currentDocument.engine, rev.docVer)}
                    style={{
                      cursor: "pointer",
                      padding: "10px 12px",
                      borderRadius: 6,
                      marginBottom: 4,
                      background: rev.docVer === (selectedDocVer ?? docVer) ? "#e6f4ff" : "transparent",
                      border: `1px solid ${rev.docVer === (selectedDocVer ?? docVer) ? "#1890ff" : "transparent"}`,
                      transition: "all 0.2s",
                    }}
                  >
                    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                      <Flex align="center" gap={8}>
                        <Tag
                          color={rev.docVer === (selectedDocVer ?? docVer) ? "blue" : "default"}
                          style={{ margin: 0 }}
                        >
                          v{rev.docVer}
                        </Tag>
                      </Flex>
                      <Text type="secondary" style={{ fontSize: 12, flex: 1, marginLeft: 8, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {rev.message || "无备注"}
                      </Text>
                    </Flex>
                  </List.Item>
                )}
              />
            )}
          </Card>

          <Card
            title={
              <Flex align="center" gap={8}>
                <FileTextOutlined />
                <Text strong>版本预览</Text>
              </Flex>
            }
            style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
            styles={{ header: { padding: "12px 16px" }, body: { flex: 1, overflow: "auto", padding: 12 } }}
          >
            {loading ? (
              <Flex justify="center" align="center" style={{ height: "100%" }}>
                <Text type="secondary">加载中...</Text>
              </Flex>
            ) : historyPreviewHtml ? (
              <div dangerouslySetInnerHTML={{ __html: historyPreviewHtml }} />
            ) : (
              <Flex justify="center" align="center" style={{ height: "100%" }}>
                <Empty description="请选择一个版本" />
              </Flex>
            )}
          </Card>
        </Flex>
      </Card>
    </div>
  );
}
