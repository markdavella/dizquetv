import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Channel } from 'dizquetv-types';
import React, { useState } from 'react';
import { ChannelProgrammingConfig } from './channel_config/ChannelProgrammingConfig.tsx';

interface CreateChannelModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: TabValues;
  channelNumber: number;
  isNew: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  currentValue: TabValues;
  value: TabValues;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, currentValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== currentValue}
      id={`simple-tabpanel-${currentValue}`}
      aria-labelledby={`simple-tab-${currentValue}`}
      {...other}
    >
      {value === currentValue && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

type TabValues = 'properties' | 'programming' | 'flex' | 'epg' | 'ffmpeg';

function defaultNewChannel(num: number): Partial<Channel> {
  return {
    name: `Channel ${num}`,
  };
}

export default function CreateChannelModal(props: CreateChannelModalProps) {
  const {
    isPending: channelLoading,
    data: existingChannel,
    error: channelError,
  } = useQuery({
    queryKey: ['channels', props.channelNumber],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(
        `http://localhost:8000/api/channel/${queryKey[1]}`,
      );
      return res.json() as Promise<Channel>;
    },
    enabled: !props.isNew,
  });

  const isEditingExistingChannel = !props.isNew;
  const isLoading = isEditingExistingChannel && channelLoading;
  const channel = isEditingExistingChannel
    ? existingChannel
    : defaultNewChannel(props.channelNumber);

  console.log(channelLoading, existingChannel, channelError);

  const [currentTab, setCurrentTab] = useState<TabValues>(
    props.defaultTab ?? 'properties',
  );

  const handleChange = (_: React.SyntheticEvent, newValue: TabValues) =>
    setCurrentTab(newValue);

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditingExistingChannel
          ? `Edit Channel ${props.channelNumber}`
          : 'Create A Channel'}
      </DialogTitle>
      {isLoading ? (
        <Skeleton>
          <DialogContent />
        </Skeleton>
      ) : (
        <DialogContent>
          <Box sx={{ borderColor: 'background.paper', borderBottom: 1 }}>
            <Tabs value={currentTab} onChange={handleChange}>
              <Tab value="properties" label="Properties" />
              <Tab value="programming" label="Programming" />
              <Tab value="flex" label="Flex" />
              <Tab value="epg" label="EPG" />
              <Tab value="ffmpeg" label="FFMPEG" />
            </Tabs>
          </Box>
          <TabPanel value="properties" currentValue={currentTab}>
            <TextField
              fullWidth
              label="Channel Number"
              value={channel?.number}
              sx={{ mt: 2, mb: 2 }}
            />
            <TextField fullWidth label="Channel Name" value={channel?.name} />
          </TabPanel>
          <TabPanel value="programming" currentValue={currentTab}>
            <ChannelProgrammingConfig />
          </TabPanel>
          <TabPanel value="flex" currentValue={currentTab}>
            Flex
          </TabPanel>
          <TabPanel value="epg" currentValue={currentTab}>
            EPG
          </TabPanel>
          <TabPanel value="ffmpeg" currentValue={currentTab}>
            FFMPEG
          </TabPanel>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button>{isEditingExistingChannel ? 'Save' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
}
