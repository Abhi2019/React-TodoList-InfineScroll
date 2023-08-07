import React, { Fragment } from "react";
import { loremIpsum } from "lorem-ipsum";
import { List, AutoSizer, ScrollSync, } from "react-virtualized";

const rowCount = 5000;
const rowHeight = 50;
const rowWidth = 700;
const listHeight = 400;

const list = Array(rowCount)
  .fill()
  .map((val, index) => {
    return {
      id: index,
      name: "Abhi",
      text: loremIpsum({
        count: 1,
        units: "sentence",
        sentenceLowerBound: 3,
        sentenceUpperBound: 8,
      }),
    };
  });

function renderRow({ index, key, style }) {
  return (
    <div key={key} className="row" style={style}>
      <div className="content">
        <div>{list[index].name}</div>
        <div>{list[index].text}</div>
      </div>
    </div>
  );
}

const ReactVirtual = () => {
  return (
    <ScrollSync> 
      {({onScroll, scrollTop, scrollLeft})=>(
        
        <div className="list">
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={rowHeight}
              rowRenderer={renderRow}
              rowCount={list.length}
              overscanRowCount={3}
              onScroll={onScroll}
            />
          )}
        </AutoSizer>
      </div>
      )}
      
    </ScrollSync>
  );
};

export default ReactVirtual;
