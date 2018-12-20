import React from "react";
import { Table, Icon, Button } from "antd";
import AbstractEditableTable from "./AbstractEditableTable";
import { EditableCell } from "./EditableCell";
import { connectDnD } from "./DragableRow";
import ErrorBoundary from "component/ErrorBoundary";

@connectDnD
export class TargetTable extends AbstractEditableTable {

  constructor( props ) {
    super( props );

    this.columns = [
      {
        title: "Target",
        dataIndex: "target",
        width: "30%",
        render: ( text, record ) => (
          <EditableCell
            record={ record }
            onSubmit={ this.onSubmit }
            onAddNew={ this.addRecord }
            dataIndex="target"
            className="input--target"
            placeholder="Enter target name"
            liftFormStateUp={ this.liftFormStateUp }
            updateRecord={ this.updateRecord }
          />
        )
      },
      {
        title: "Selector",
        dataIndex: "selector",
        width: "calc(70% - 160px)",
        render: ( text, record ) => (
          <EditableCell
            record={ record }
            onSubmit={ this.onSubmit }
            dataIndex="selector"
            className="input--selector"
            placeholder="Enter selector"
            liftFormStateUp={ this.liftFormStateUp }
            updateRecord={ this.updateRecord }
          />
        )
      },
      this.getActionColumn()
    ];

  }

  onRowClassName = ( record ) => {
    return "model--target " + this.getRightClickClassName( record );
  }

  fields = [ "target", "selector" ];

  model = "Target";

  render() {
    const data = Object.values( this.props.targets );
    return (
      <div className="box-margin-vertical">
        <ErrorBoundary>
          <Table
            id="cTargetTable"
            className="draggable-table"
            components={this.components}
            rowClassName={ this.onRowClassName }
            onRow={this.onRow}
            showHeader={ true }
            dataSource={ data }
            columns={this.columns}
            pagination={false}

            footer={() => ( <Button id="cTargetTableAddBtn"
              onClick={ this.addRecord }><Icon type="plus" />Add a target</Button> )}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

