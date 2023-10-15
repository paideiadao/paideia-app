import { useEffect, useState, useContext } from "react";
import DiscussionContext from "@lib/dao/discussion/DiscussionContext";
import ProposalContext from "@lib/dao/proposal/ProposalContext";
import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";
import { useRouter } from "next/router";
import useDidMountEffect from "@components/utilities/hooks";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";

// proposal or discussion
// abstract: img, name, id

const Reference: React.FC<{ context?: boolean }> = (props) => {
  const currentContext =
    props.context === undefined ? DiscussionContext : ProposalContext;

  const globalContext = useContext(currentContext);

  const router = useRouter();
  const { r } = router.query;
  const [references, setReferences] = useState<number[]>(
    globalContext.api.value.references
  );

  const [daoData] = globalContext.api.daoState;
  const daoId = daoData.id;

  useEffect(() => {
    let temp = [...references];
    temp.push(parseInt(r as string));
    setReferences(r === undefined ? references : temp);
  }, [r, references]);

  useDidMountEffect(() => {
    setReferences(globalContext.api.value.references);
  }, [globalContext.api.value.references]);

  const { data, error } = useSWR(
    daoId !== undefined && `/proposals/by_dao_id/${daoId}`,
    fetcher
  );

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      // @ts-ignore
      isOptionEqualToValue={(option: any, temp: string) =>
        references.indexOf(option.id) > -1
      }
      options={data || []}
      filterSelectedOptions
      // @ts-ignore
      value={references}
      sx={{ mt: "1rem" }}
      // @ts-ignore
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: any, c: number) => {
          let temp =
            data === undefined
              ? [undefined]
              : data.filter((i: any) => i.id === option);
          let val = temp[0];
          return (
            val !== undefined && (
              <Chip
                color="primary"
                variant="filled"
                label={val.name}
                {...getTagProps({ index: c })}
                key={"chip-tag-" + c}
                avatar={<Avatar sx={{ fontSize: ".8rem" }}></Avatar>}
              />
            )
          );
        })
      }
      onInputChange={(
        event: React.SyntheticEvent,
        _value: string,
        reason: string
      ) => {}}
      // @ts-ignore
      onChange={(
        event: React.SyntheticEvent,
        _value: any,
        reason: string,
        details?: string
      ) => {
        globalContext.api.setValue({
          ...globalContext.api.value,
          references: _value,
        });
      }}
      getOptionLabel={(option: any) => option.id.toString()}
      renderOption={(props, option: any) => (
        // @ts-ignore
        <li
          {...props}
          onClick={() => {
            let temp = [...references];
            let index = temp.indexOf(option.id);

            if (index > -1) {
              temp.splice(index, 1);
            } else {
              temp.push(option.id);
            }

            globalContext.api.setValue({
              ...globalContext.api.value,
              references: temp,
            });
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Avatar sx={{ width: "2rem", height: "2rem" }}></Avatar>
          <Box sx={{ ml: ".5rem", fontSize: ".9rem" }}>
            {option.name}
            <Box
              sx={{
                fontSize: ".8rem",
                fontWeight: 400,
                color: "text.secondary",
              }}
            >
              ID: {option.id}
            </Box>
          </Box>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          // InputProps={{
          //   notched: true
          // }}
          label="Reference an existing proposal or discussion"
          placeholder="Search for proposal"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <span>
                {!data ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </span>
            ),
          }}
        />
      )}
    />
  );
};

export default Reference;
