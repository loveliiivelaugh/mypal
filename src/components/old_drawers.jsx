
<Drawer
        anchor="right"
        open={Object.keys(open).some(key => open?.[key] === "right")}
        onClose={() => handleDrawers(getOpenSection(), false)}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', width: "40vw" },
        }}
      >
        <Box sx={{ overflow: 'auto' }} component="form" onSubmit={handleSubmit}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton onClick={() => setState({...state, open: {...open, food: "bottom" }})}><ArrowBack /></IconButton>
            <Typography variant="h6" textAlign="center">Add {cap_first(getOpenSection())}</Typography>
            <IconButton type="submit"><Check /></IconButton>
          </Toolbar>

          { // Render "right" drawer content based on open section
            {
            help: (<TdeeCalculator />),
            weight: <></>,
            exercise: (
              <List>
                <ListItem sx={{ justifyContent: "space-between" }} primary={state?.exerciseSelected?.name}/>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel># of Sets</InputLabel>
                  <TextField
                    id="sets"
                    type="number"
                    value={state?.sets}
                    onChange={handleChange}
                    placeholder={5}
                  />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel># of Reps</InputLabel>
                  <TextField
                    id="reps"
                    type="number"
                    value={state?.reps}
                    onChange={handleChange}
                    placeholder={10}
                  />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Date</InputLabel>
                  <BasicDatePicker id="date" label="Date" value={state["date"]} handleChange={handleChange} placeholder={new Date().toLocaleString()} /> 
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <Button variant="outlined" fullWidth type="submit">Add Exercise</Button>
                </ListItem>
              </List>
            ),
            food: (
              <List>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <ListItemText primary={state?.foodSelected?.display_name_translations?.["en"]} secondary={state?.foodSelected?.display_name_translations?.["en"]} />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Serving Size</InputLabel>
                  <TextField id="serving_size" value={state?.serving_size} onChange={handleChange} placeholder="4oz" />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Number of Servings</InputLabel>
                  <TextField id="num_servings" value={state?.num_servings} onChange={handleChange} placeholder={1} />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Time</InputLabel>
                  <TextField id="serving_time" value={state?.serving_time} onChange={handleChange} placeholder={new Date().toLocaleString()} />
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <InputLabel>Meal</InputLabel>
                  <Select id="meal" value={state?.meal || "Breakfast"} onChange={handleChange} placeholder="Select a Meal">
                    <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                    <MenuItem value={"Lunch"}>Lunch</MenuItem>
                    <MenuItem value={"Dinner"}>Dinner</MenuItem>
                    <MenuItem value={"Snack"}>Snack</MenuItem>
                  </Select>
                </ListItem>
                <ListItem>
                  <Stack variant="row">

                  </Stack>
                </ListItem>
              </List>
            )
          }[getOpenSection()]}

        </Box>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={Object.keys(open).some(key => open?.[key] === "bottom")}
        onClose={() => handleDrawers(false)}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
        }}
      >
      {/* {console.log("state", state)} */}
        <Toolbar />
        <Box sx={{ overflow: 'auto' }} component="form" onSubmit={handleSubmit}>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton onClick={() => handleDrawers(false)}>
              <Close />
            </IconButton>
            <Typography variant="h6" component="p" gutterBottom>
              {`Add ${cap_first(getOpenSection())}`}
            </Typography>
            <IconButton type="submit">✔️</IconButton>
          </Box>
          <Toolbar />
          {{
            weight: (
              <>
                <Box sx={{ width: "100%", display: "flex" }}>
                  <TextField
                    id="weight"
                    label="Weight"
                    variant="outlined"
                    type="float"
                    fullWidth
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 0, max: 1000 } }}

                  />
                </Box>
                <Box sx={{ width: "100%", display: "flex" }}>
                  <BasicDatePicker id="date" label="Date" value={state["date"]} handleChange={handleChange} /> 
                </Box>
                <Box sx={{ width: "100%", display: "flex", border: "1px solid rgba(33,33,33,0.2)", borderRadius: 1, justifyContent: "space-between", my: 1, py: 1 }}>
                  <Typography id="demo-simple-select-label" variant="body1">Progress Photo</Typography>
                  <IconButton p={1}>
                    <Attachment />
                  </IconButton>
                </Box>
              </>
            ),
            food: (
              <>
                <Box sx={{ width: "90%", display: "flex", justifyContent:"space-around" }}>
                  <Autocomplete
                    id="food"
                    options={foodRepoData?.data || []}
                    fullWidth
                    onLoadedData={() => setState({...state, skip: true })}
                    loading={isLoading}
                    sx={{ ml: 4 }}
                    getOptionLabel={(option) => {
                      // console.log("getOptionLabel: ", option, option?.name)
                      return option?.display_name_translations["en"]
                    }}
                    renderOption={(props, option) => {
                      // return option
                      const image = option.images.find(({categories}) => categories.includes("Front"))?.thumb;
                      // console.log("renderOption: ", props, option, image)
                      return (
                        <Stack direction="row" spacing={1} p={1} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(33,33,33,0.1)"} }} onClick={() => setState({...state, foodSelected: option, open: {...open, food: "right" }})}>
                          <Avatar src={image} />
                          <Typography variant="h6">{option?.display_name_translations["en"]}</Typography>
                          <Chip size="small" label={option?.country} />
                        </Stack>
                      )
                    }}
                    renderInput={(params) => (
                      <Box ref={params.InputProps.ref}>
                        <TextField
                          type="text"
                          {...params.inputProps}
                          value={state.foodName}
                          placeholder="Search for a food"
                          onChange={handleChange}
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton p={1} onClick={() => setState({...state, skip: false })}>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton p={1} onClick={() => setState({...state, foodName: "" })}>
                                  <QrCodeScannerIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Box>
                    )}
                  />
                </Box>
                <Grid id="food-history-container" container>
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Tabs>
                      {["All", "My Meals", "My Recipes", "My Foods"]
                        .map((tab, i) => <Tab key={`${tab}_tab`} label={tab} value={i} />
                      )}
                    </Tabs>
                  </Grid>

                  {/* TODO: Quick Add Buttons Section goes here */}
                  
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">History</Typography>
                      <Chip component={Button} variant="outlined" label="Most Recent" onClick={() => createAlert("success", "SUper Super tesT!")}/>
                    </Box>
                    <List id="food-history-list">
                      {hooks?.food?.isLoading
                        ? <CircularProgress />
                        : hooks?.food?.data.map((food, i) => (
                        <ListItem key={`${food.date}_${food.name}`} component={ListItemButton}>
                          <ListItemText primary={food.name} secondary={foodHistory.formatFoodObjectToString(food)} />
                          <Box>
                            <IconButton 
                              onClick={() => setState({
                                ...state,
                                foodSelected: foodRepoData.data
                                  .find(({ display_name_translations }) => (display_name_translations["en"] === food.name)), 
                                open: {...open, food: "right" }
                              })}
                            >
                              <Add />
                            </IconButton>
                            <IconButton onClick={() => dbApi.delete("food", food.id)}><Delete /></IconButton>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  
                </Grid>
              </>
            ),
            exercise: (
              <>
                <Box sx={{ width: "90%", display: "flex", justifyContent:"space-around" }}>
                  <Autocomplete
                    id="exerciseName"
                    options={mock_exercises || data || []}
                    fullWidth
                    onLoadedData={() => setState({...state, skip: true })}
                    loading={isLoading}
                    sx={{ ml: 4 }}
                    getOptionLabel={(option) => {
                      console.log("getOptionLabel: ", option, option?.name)
                      return option?.name
                    }}
                    renderOption={(props, option) => {
                      console.log("renderOption: ", props, option)
                      // return option
                      return (
                        <Stack direction="row" spacing={1} p={1} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(33,33,33,0.1)"} }} onClick={() => setState({ ...state, exerciseSelected: option, open:{...open, [getOpenSection()]: "right"} })}>
                          <>{option?.name}{` `}</>
                          <Chip size="small" label={option?.muscle} />
                          <Chip variant="outlined" size="small" label={option?.type} />
                        </Stack>
                      )
                    }}
                    onClick={e => console.log("click!!", e)}
                    renderInput={(params) => (
                      <Box ref={params.InputProps.ref}>
                        <TextField
                          type="text"
                          {...params.inputProps}
                          value={state.exerciseName}
                          placeholder="Search for an exercise"
                          onChange={handleChange}
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton p={1} onClick={() => setState({...state, skip: false })}>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    )}
                  />
                </Box>
                <Grid id="exercise-history-container" container>
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Tabs>
                      {tabs.map(tab => <Tab key={`${tab}_tab`} label={tab} />)}
                    </Tabs>
                  </Grid>
                  
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body1">History</Typography>
                      <Chip component={Button} variant="outlined" label="Most Recent" />
                    </Box>
                    <List id="exercise-history-list">
                      {exerciseHistory.data.map(({ date, exercise, sets }) => (
                        <ListItem key={`${date}_${exercise}`}>
                          <ListItemText primary={exercise} secondary={exerciseHistory.formatSetsArrayToString(sets)} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ p: 2}}>
                    <Button variant="outlined" fullWidth onClick={() => handleDrawers("right", getOpenSection(), 'open')}>
                      Create a New Exercise
                    </Button>
                  </Grid>
                </Grid>
              </>
            ),
          }[getOpenSection()]}
        </Box>
      </Drawer>