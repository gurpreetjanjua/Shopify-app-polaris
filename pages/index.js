import Form from './form';
import { Row, Col } from 'antd';

function Index () {
    return (
        <>
            <Row>
                <Col span={12} offset={2}>
                    <Form />
                </Col>
            </Row>
        </>
    );
};

export default Index;