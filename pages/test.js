import React from "react";
import { Card, Form, FormLayout, TextField, ChoiceList, Button, InlineError } from '@shopify/polaris';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storeName: '',
            permissions: [],
            loading: false,
            errors: {}
        }
    }

    handleStoreName = (value) => {
        this.setState({ storeName: value });
    }

    handleChange = (value) => {
        this.setState({ permissions: value })
    }

    validateForm = () => {
        let isValid = true;
        let errors = {};
        if (this.state.storeName == '') {
            errors.storeName = true;
            isValid = false;
        }
        this.setState({ errors: errors });
        return isValid;
    }

    handleForm = (e) => {
        e.preventDefault();
        const { getData } = this.props;
        if (this.validateForm()) {
            this.setState({ loading: true });
            window.location.href = "/install?shop=" + this.state.storeName.concat('.myshopify.com') + "&scopes=" + this.state.permissions.toString();
        }
    }

    render() {
        return (
            <div className="login-card">
                <Card title="App Setup Locally Process" sectioned>
                    <Form noValidate={true} onSubmit={this.handleForm}>
                        <FormLayout>
                            <TextField
                                label="Store name"
                                value={this.state.storeName}
                                id="storename"
                                onChange={this.handleStoreName}
                                helpText={<span>Please enter your store name without .myshopify.com</span>}
                            />
                            {this.state.errors.storeName && <InlineError message="Store name is required" />}
                            <ChoiceList
                                title="Permissions"
                                allowMultiple
                                choices={[
                                    { label: 'read_content', value: 'read_content' },
                                    { label: 'write_content', value: 'write_content' },
                                    { label: 'read_themes', value: 'read_themes' },
                                    { label: 'write_themes', value: 'write_themes' },
                                    { label: 'read_products', value: 'read_products' },
                                    { label: 'write_products', value: 'write_products' },
                                    { label: 'read_product_listings', value: 'read_product_listings' },
                                    { label: 'read_customers', value: 'read_customers' },
                                    { label: 'write_customers', value: 'write_customers' },
                                    { label: 'read_orders', value: 'read_orders' },
                                    { label: 'write_orders', value: 'write_orders' },
                                    { label: 'read_all_orders', value: 'read_all_orders' },
                                    { label: 'read_draft_orders', value: 'read_draft_orders' },
                                    { label: 'write_draft_orders', value: 'write_draft_orders' },
                                    { label: 'read_inventory', value: 'read_inventory' },
                                    { label: 'read_script_tags', value: 'read_script_tags' },
                                    { label: 'write_script_tags', value: 'write_script_tags' },
                                ]}
                                selected={this.state.permissions}
                                onChange={this.handleChange}
                            />
                            <Button submit primary fullWidth loading={this.state.loading}>Install App</Button>
                        </FormLayout>
                    </Form>
                </Card>
            </div>
        );
    }
}


export default Index