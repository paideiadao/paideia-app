import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, Button, IconButton } from "@mui/material";
import {
  ActionType,
  IProposalAction,
  IProposalOption,
} from "@pages/[dao]/proposal/create";
import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

import useDidMountEffect from "@components/utilities/hooks";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import DraggableCard, { DraggableHeader } from "./DraggableContent";
import { Add } from "@mui/icons-material";
import DaoDescription from "./Actions/DaoDescription";
import SendFunds from "./Actions/SendFunds";
import { ISendFunds } from "../YesNo/Actions/SendFunds";
import {
  defaultLiquidityPoolData,
  ILiquidityPool,
} from "../YesNo/Actions/LiquidityPool";
import LiquidityPool from "./Actions/LiqudityPool";
import { IDaoDescription } from "../YesNo/Actions/DaoDescription";
import QuadraticVoting from "./Actions/QuadraticVoting";
import { IQuadradicVoting } from "../YesNo/Actions/QuadraticVoting";
import VoteDuration from "./Actions/VoteDuration";
import { IVoteDuration } from "../YesNo/Actions/VoteDuration";
import { ISupport } from "../YesNo/Actions/Support";
import Support from "./Actions/Support";
import Quorum from "./Actions/Quorum";
import { IQuorum } from "../YesNo/Actions/Quorum";
import {
  defaultOptimisticGovernanceData,
  IOptimisticGovernance,
} from "../YesNo/Actions/OptimisticGovernance";
import OptimisticGovernance from "./Actions/OptimisticGovernance";

// fake data generator
const getItems = (count: any) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (
  list: IProposalOption[],
  startIndex: number,
  endIndex: number
): IProposalOption[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle,
  compact: boolean
) => ({
  // some basic styles to make the items look a bit nicer
  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle,
  backgroundColor: "fileInput.outer",
  color: "text.primary",
  borderRadius: ".3rem",
  my: "1rem",
  border: 1,
  borderColor: isDragging ? "primary.main" : "border.main",
  px: ".75rem",
  py: ".5rem",
});

const getListStyle = (
  isDraggingOver: boolean,
  compact: boolean,
  items: IProposalOption[]
) => ({
  backgroundColor: "background.default",
  py: ".5rem",
  width: "100%",
  borderRadius: ".3rem",
});

export const getData = (name: string): ActionType => {
  if (name === "Change DAO's description") {
    return {
      shortDescription: "",
    };
  } else if (name === "Send Funds") {
    return {
      recipients: [{ address: "", ergs: 0, tokens: [] }],
      recurring: false,
      activation_time: 0,
      voting_duration: "0",
    };
  } else if (name === "Create Liquidity Pool") {
    return defaultLiquidityPoolData;
  } else if (name === "Quadratic Voting") {
    return {
      isActive: false,
    };
  } else if (name === "Vote Duration") {
    return {
      voteDuration: 0,
      voteDurationUnits: "weeks",
    };
  } else if (name === "Support") {
    return {
      supportNeeded: 51,
    };
  } else if (name === "Quorum") {
    return {
      quorum: 4,
    };
  } else if (name === "Optimistic Governance") {
    return defaultOptimisticGovernanceData;
  }
};

const DraggableContext: React.FC<{ name: string }> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [compact, setCompact] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<IProposalOption[]>(
    context.api.value.actions[0].options
  );

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    setCompact(false);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const tempItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(tempItems);
  };

  const getContent = (
    item: IProposalOption,
    index: number
  ): React.ReactNode => {
    if (item.data === undefined) {
      return undefined;
    }
    if (props.name === "Change DAO's description") {
      return (
        <DaoDescription
          set={(val: string) => {
            let tempItems = [...items];
            (tempItems[index].data as IDaoDescription).shortDescription = val;
            setItems(tempItems);
          }}
          shortDescription={(item.data as IDaoDescription).shortDescription}
        />
      );
    } else if (props.name === "Send funds") {
      return (
        <SendFunds
          set={(val: ISendFunds) => {
            let tempItems = [...items];
            tempItems[index].data = val;
            setItems(tempItems);
          }}
          recipients={(item.data as ISendFunds).recipients}
          recurring={(item.data as ISendFunds).recurring}
          activation_time={0}
          voting_duration="0"
        />
      );
    } else if (props.name === "Create liquidity pool") {
      return (
        <LiquidityPool
          set={(val: ILiquidityPool) => {
            let tempItems = [...items];
            tempItems[index].data = val;
            setItems(tempItems);
          }}
          isNew={(item.data as ILiquidityPool).isNew}
          tokenPrice={(item.data as ILiquidityPool).tokenPrice}
          tradingPair={(item.data as ILiquidityPool).tradingPair}
          dex={(item.data as ILiquidityPool).dex}
          startDate={(item.data as ILiquidityPool).startDate}
          treasuryAmount={(item.data as ILiquidityPool).treasuryAmount}
          balance={(item.data as ILiquidityPool).balance}
          contingency={(item.data as ILiquidityPool).contingency}
        />
      );
    } else if (props.name === "Quadratic voting") {
      return (
        <QuadraticVoting
          set={(val: IQuadradicVoting) => {
            let tempItems = [...items];
            tempItems[index].data = val;
            setItems(tempItems);
          }}
          isActive={(item.data as IQuadradicVoting).isActive}
        />
      );
    } else if (props.name === "Vote duration") {
      return (
        <VoteDuration
          set={(val: IVoteDuration) => {
            let tempItems = [...items];
            tempItems[index].data = val;
            setItems(tempItems);
          }}
          voteDuration={(item.data as IVoteDuration).voteDuration}
          voteDurationUnits={(item.data as IVoteDuration).voteDurationUnits}
        />
      );
    } else if (props.name === "Support") {
      return (
        <Support
          set={(val: ISupport) => {
            let tempItems = [...items];
            tempItems[index].data = val;
            setItems(tempItems);
          }}
          supportNeeded={(item.data as ISupport).supportNeeded}
        />
      );
    } else if (props.name === "Quorum") {
      return (
        <Quorum
          set={(val: IQuorum) => {
            let tempItems = [...items];
            tempItems[index].data = val;
            setItems(tempItems);
          }}
          quorum={(item.data as IQuorum).quorum}
        />
      );
    } else if (props.name === "Optimistic governance") {
      return (
        <OptimisticGovernance
          set={(val: IOptimisticGovernance) => {
            let tempItems = [...items];
            tempItems[index].data = val;
            setItems(tempItems);
          }}
          wallets={(item.data as IOptimisticGovernance).wallets}
          activated={(item.data as IOptimisticGovernance).activated}
        />
      );
    } else {
      return <>{props.name}...</>;
    }
  };

  React.useEffect(() => {
    if (items === undefined) {
      setItems(context.api.value.actions[0].options);
    }
  }, [context.api.value.actions]);

  useDidMountEffect(() => {
    setItems(context.api.value.actions[0].options);
  }, [props.name]);

  useDidMountEffect(() => {
    let tempActions = context.api.value.actions[0];
    let tempItems = items === undefined ? [] : [...items];
    tempActions.options = tempItems;
    context.api.setValue({
      ...context.api.value,
      actions: [tempActions],
    });
  }, [items]);

  const compactContainerStyle = {
    border: 1,
    borderColor: "border.main",
    borderRadius: ".3rem",
    px: ".75rem",
    py: ".5rem",
    my: ".75rem",
  };

  const declineProposal: IProposalOption = {
    name: "Decline proposal",
    description:
      "If you do not agree with any of the provided options, choose this one.",
    data: undefined,
    rank: 2,
    default: true,
  };
  return (
    props.name !== undefined &&
    items !== undefined && (
      <>
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeDragStart={() => {
            setCompact(true);
          }}
        >
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={getListStyle(snapshot.isDraggingOver, compact, items)}
              >
                {items.map((item: IProposalOption, index: number) => (
                  <>
                    <Draggable
                      key={`temp-index-${index}`}
                      draggableId={`temp-index-${index}`}
                      index={index}
                      isDragDisabled={items.length < 1}
                    >
                      {(_provided, snapshot) => {
                        return (
                          <Box
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                            sx={getItemStyle(
                              snapshot.isDragging,
                              _provided.draggableProps.style,
                              compact
                            )}
                          >
                            <DraggableHeader
                              compact={compact}
                              item={item}
                              index={index}
                              items={items}
                              snapshot={snapshot}
                              remove={() => {
                                let tempItems = [...items];
                                tempItems.splice(index, 1);
                                setItems(tempItems);
                              }}
                            />
                            <DraggableCard
                              set={(val: IProposalOption[]) => setItems(val)}
                              item={item}
                              index={index}
                              items={items}
                              content={getContent(item, index)}
                            />
                          </Box>
                        );
                      }}
                    </Draggable>
                  </>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            startIcon={<Add />}
            size="small"
            onClick={() => {
              let temp = [...items];
              temp.push({
                name: "",
                description: "",
                data: getData(props.name),
                rank: items.length + 1,
              });
              setItems(temp);
            }}
          >
            Add Another
          </Button>
        </Box>
        <Box
          sx={{
            ...getItemStyle(
              false,
              { transition: undefined, transform: undefined },
              compact
            ),
            mx: ".5rem",
          }}
        >
          <DraggableHeader
            item={declineProposal}
            index={-1}
            items={items}
            compact={compact}
          />
          <DraggableCard item={declineProposal} index={-1} items={items} />
        </Box>
      </>
    )
  );
};

export default DraggableContext;
